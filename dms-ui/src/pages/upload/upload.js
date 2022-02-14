

import UploadFileDir from './uploaddir';
import UploadFile from './uploadfile';

export default function Upload({ rootPath, refetch}) {
    return (<>
        <div className="flex flex-row border-blue-300 shadow-sm pb-5  px-3 w-80">
            <UploadFile rootPath={rootPath} refetch={refetch}/>
            {!rootPath && <UploadFileDir refetch={refetch}/>}
        </div>
    </>
    )
}
