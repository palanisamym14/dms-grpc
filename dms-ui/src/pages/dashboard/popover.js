import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'
import API from '../../util/api';

export default function CustomPopover({ data, refetch }) {
    let solutions = [
        {
            name: 'Rename',
            href: '##',
        },
        {
            name: 'Move',
            href: '##',
        },
        {
            name: 'Delete',
            href: '##'
        }
    ]
    if (data.type === "FILE") {
        solutions.push({
            name: 'Download',
            href: '##',
        })
    }
    solutions = solutions.reverse()

    const dropdownSelect = (item) => {
        switch (item.name) {
            case "Delete":
                deleteItem();
                break;
            case "Download":
                downloadFile()
                break
            default:
                break;
        }
    }

    const deleteItem = () => {
        API.delete(`/directory/${data._id}`,).then((res) => {
            console.log(res);
            refetch(data.parent);
        }).catch(err => { console.log(err) })
    }

    const downloadFile = () => {
        const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_PORT}/api`;
        window.open(`${BASE_URL}/file/download/${data._id}?authorization=${localStorage.getItem('token')}`);
    }

    return (
        <div className="w-full max-w-sm px-4">
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button
                            className={`
                ${open ? '' : 'text-opacity-90'} inline-flex items-center text-base font-medium `}
                        >
                            <span>Action</span>
                            <ChevronDownIcon
                                className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-gray-500 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                                aria-hidden="true"
                            />
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute z-10 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 w-48">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative flex flex-col gap-6 bg-white p-3">
                                        {solutions.map((item) => (
                                            <a
                                                key={item.name}
                                                href={"#"}
                                                className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                                onClick={() => dropdownSelect(item)}
                                            >
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {item.name}
                                                    </p>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    )
}
