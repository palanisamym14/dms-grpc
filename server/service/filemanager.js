const mongoose = require('mongoose');
const fileProcessor = require('./managefile');
const FilemanagerModel = require('../models/filemanager');
const helper = require('./../helper')

exports.create = async (body) => {
    try {
        const user = new FilemanagerModel(body);
        return user.save();
    } catch (error) {
        throw error;
    }
};

exports.uploadFile = async (body) => {
    try {

        if (body.parent) {
            const dir = await FilemanagerModel.findOne({ _id: body.parent, type: 'DIR' });
            if (!dir) {
                throw "parent id not an directory"
            }
        }
        await fileProcessor.writeFile(body);
        body.path = body.originalname;
        const user = new FilemanagerModel(body);
        return user.save();
    } catch (error) {
        throw error;
    }
};

const aggregation = (body) => {
    const aggregate = FilemanagerModel.aggregate();
    aggregate.match({ ...body });
    aggregate.graphLookup({
        from: 'directory',
        startWith: "$parent",
        connectFromField: 'parent',
        connectToField: '_id',
        as: 'paths',
        depthField: "level"
    });
    return aggregate.exec();
}

// Retrieve and return all directories from the database.
exports.findAll = async (body) => {
    try {
        if (body.parent && !helper.isValidId(body.parent)) {
            throw `${body.id} is invalid parent`;
        }
        const _body = {
            parent: null,
            owner: mongoose.Types.ObjectId(body.owner)
        }
        if (body.parent) {
            _body.parent = mongoose.Types.ObjectId(body.parent);
        }
        return await aggregation(_body);
    } catch (error) {
        throw error;
    }
};

exports.findOne = async (body) => {
    try {
        if (!helper.isValidId(body.id)) {
            throw `${body.id} is invalid`;
        }

        const _body = {
            _id: mongoose.Types.ObjectId(body.id),
            owner: mongoose.Types.ObjectId(body.owner)
        }

        const [res] = await aggregation(_body);
        return res?.type ? res : {};
    } catch (error) {
        throw error;
    }
};


exports.renameDirFile = async (body) => {
    let session;
    try {
        const data = await this.findOne(body);

        if (data.type === "DIR") {
            await FilemanagerModel.updateOne({ _id: body.id, owner: body.owner }, { path: body.newName }).exec();
        } else {
            const oldPath = helper.constructExistingPath(data, data.path);
            const newPath = helper.constructExistingPath(data, body.newName);

            session = await FilemanagerModel.startSession();
            await session.withTransaction(async () => {
                const updated = await FilemanagerModel.updateOne({ _id: body.id, owner: body.owner }, { path: body.newName }).exec();
                await fileProcessor.renameDirFile(body, oldPath, newPath);
                return updated;
            });
            session.endSession();
        }
        return this.findOne(body);
    } catch (error) {
        throw error;
    }
};

