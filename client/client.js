const PROTO_PATH = "./proto/filemanager.proto";
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	arrays: true
});

const DirectoryService = grpc.loadPackageDefinition(packageDefinition).DirectoryService;
const UserService = grpc.loadPackageDefinition(packageDefinition).UserService;
const directoryServiceClient = new DirectoryService(
	"localhost:30043",
	grpc.credentials.createInsecure()
);
const userServiceClient = new UserService(
	"localhost:30043",
	grpc.credentials.createInsecure()
);

module.exports = {
	directoryServiceClient,
	userServiceClient
}