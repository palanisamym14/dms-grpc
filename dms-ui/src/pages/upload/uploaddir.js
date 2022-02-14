

import { useState } from 'react';
import { useForm } from "react-hook-form";
import API from '../../util/api'
import { FolderAddIcon } from '@heroicons/react/outline';
import Dialog from './../dialog';




export default function UploadFileDir({ refetch}) {
    const [dirUpload, setdirUpload] = useState(false)
    const { register, handleSubmit, formState: { errors }
    } = useForm()

    const onSubmit = (data) => {
        API.post('/directory', data).then(res => { refetch() }).catch(() => setdirUpload(false)).finally(() => setdirUpload(false))
    }


    return <><div className="mt-5">
        <a
            href="#"
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-400"
            onClick={() => setdirUpload(true)}
        >
            <FolderAddIcon className="h-6 w-6" />
        </a>
    </div>
        {dirUpload && <Dialog closeModal={() => setdirUpload(false)} title="Create Directory">

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input {...register("path", { required: true })} type="text" name="path" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                    {errors.path && <span className="text-red-600 text-sm">This field is required</span>}
                </div>
                <div className="flex justify-end">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"><div className="flex">Create  <FolderAddIcon className="ml-3 h-6 w-6" /> </div></button>
                </div>
            </form>
        </Dialog>}
    </>
}
