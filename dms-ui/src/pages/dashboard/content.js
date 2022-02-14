
import API from '../../util/api'
import { useState, useEffect } from 'react';
import Upload from '../upload/upload';
import { FolderAddIcon, NewspaperIcon } from '@heroicons/react/outline';
import Popover from './popover'

export default function Content() {
    const [documentList, setDocumentList] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = (id = null) => {
        console.log(id)
        let path = `/directory`
        if (id) {
            path = path.concat(`?id=${id}`)
        }
        API.get(path).then((res) => {
            setDocumentList(res)
        }).catch(err => { console.log(err) })
    }

    const itemSelect = (item) => {
        if (item.type === "DIR") {
            getData(item._id);
        }
    }

    return (<>
        <div className="flex" >
            <div className="border-x-purple-800 shadow h-3/4">
                <Upload rootPath={documentList[0]?.parent || null} refetch={(_tempId) => getData(_tempId)} />
                <div className="block text-gray-700 text-lg font-semibold py-2 px-2">
                    <span className="cursor-pointer" onClick={() => itemSelect({ type: "DIR" })}> FileManager </span> {
                        documentList[0]?.paths?.map(item =>
                            <span key={item._id} className="text-sm text-blue-600 underline mx-1"
                                onClick={() => itemSelect(item)}>/ {item.path}
                            </span>)}
                </div>
            </div>
            <div className="flex flex-row">
                <div className="w-full">
                    <div className="flexp-4 px-3 py-10">
                        {/* justify-center  */}
                        <div className="w-full max-w-md">
                            <div className="bg-white px-3 py-2 mb-4">
                                <div className="py-3 text-sm">
                                    {documentList.filter(dir => ["DIR", "FILE"].includes(dir.type)).map(e => <>
                                        <div key={e._id}><>
                                            <div className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2"
                                            >
                                                {e.type === "DIR" && <FolderAddIcon className="h-6 w-6" onClick={() => itemSelect(e)} />}
                                                {e.type === "FILE" && <NewspaperIcon className="h-6 w-6" />}
                                                <div className="flex-grow font-medium px-2" onClick={() => itemSelect(e)}>{e.path}</div>
                                                <div className="text-sm font-normal text-gray-500 tracking-wide"><Popover data={e} refetch={(_tempId) => getData(_tempId)}/></div>
                                            </div>
                                        </></div>
                                    </>)}
                                    {documentList.filter(dir => ["DIR", "FILE"].includes(dir.type)).length === 0 && <div className="flex justify-center flex-col"><NewspaperIcon className="h-14 w-14" /><div>Empty</div></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
