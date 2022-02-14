

import { useState } from 'react';
import { useForm } from "react-hook-form";
import API from '../../util/api'
import { NewspaperIcon } from '@heroicons/react/outline';
import Dialog from './../dialog';

export default function UploadFile({ rootPath, refetch}) {
    const [fileUpload, setfileUpload] = useState(false)
    const { register, handleSubmit, formState: { errors }
    } = useForm()

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append(
            "file",
            data.file[0],
            data.file[0].name
        );
        if (rootPath){
            formData.append('parent', rootPath)
        }
        API.post('/file/upload', formData).then(res => { refetch(rootPath) }).catch(() => setfileUpload(false)).finally(() => setfileUpload(false));
    }


    return <><div className="mt-5">
        <a
            href="#"
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-400"
            onClick={() => setfileUpload(true)}
        >
            <NewspaperIcon className="h-6 w-6" />
        </a>
    </div>
        {fileUpload && <Dialog closeModal={() => setfileUpload(false)} title="Upload File">

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input {...register("file", { required: true })} type="file" name="file" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                    {errors.email && <span className="text-red-600 text-sm">This field is required</span>}
                </div>
                <div className="flex justify-end">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"><div className="flex">Upload  <NewspaperIcon className="ml-3 h-6 w-6" /> </div></button>
                </div>
            </form>
        </Dialog>}
    </>
}