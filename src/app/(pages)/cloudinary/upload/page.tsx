"use client";
import { getErrorMessage } from "@/utils/funckage";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import UploadIcon from "@/components/icons/upload_icon";
import { handleKeyUp } from "@/utils/handlers";
import { LiaTimesSolid } from "react-icons/lia";
import { ToastContainer, toast } from "react-toastify";
import { Upload } from "lucide-react";
import { GiCancel } from "react-icons/gi";
const uniqueId = uuidv4();

const CloudinaryUpload = () => {
    const handleError = (error: any) => {
        const message = getErrorMessage(error);
        toast(message, { autoClose: 2000 });
    };
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState<string>("");
    const [image, setImage] = useState<string | null>(null);
    const [file_name, set_file_name] = useState<string>("");
    const inputRef = useRef(null);

    const upload_image = async () => {
        const response = await fetch("/api/cloudinary", {
            method: "POST",
            body: JSON.stringify({ image, file_name, sector: "avatar" }),
        });
        const result = await response.json();
        if (result.success) {
            setUrl(result.data.secure_url);
            toast(result.message, { type: "success" });
        } else {
            toast(result.message, {
                type: "error",
            });
        }
    };

    const handle_image = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        setLoading(true);
        try {
            if (input.files) {
                const file = input.files[0];
                if (file) {
                    if (file.type.startsWith("image/")) {
                        const reader = new FileReader();

                        reader.onload = async (e) => {
                            const base64String = e.target?.result as string;
                            setImage(base64String);
                            set_file_name(file.name);
                        };
                        reader.readAsDataURL(file);
                    }
                }
            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-w-[50vw] p-5 dark:bg-black dark:text-gray-300">
            <h2 className="text-center mb-4">Upload Image To Cloudinary</h2>
            {image ? (
                <div className="flex flex-col items-center">
                    <Image
                        src={image}
                        alt={`Preview${uniqueId}`}
                        width={500}
                        height={500}
                    />
                    <div className="flex justify-between w-[50%] my-3">
                        <button
                            onKeyUp={(event) =>
                                handleKeyUp(event, () => setImage(null))
                            }
                            onClick={() => setImage(null)}
                            className="flex items-center gap-1 bg-background text-foreground border border-solid border-black/[.08] dark:border-white/[.145] px-4 py-2 rounded-md "
                        >
                            Cancel <LiaTimesSolid size={18} />
                        </button>
                        <button
                            onKeyUp={(event) =>
                                handleKeyUp(event, () => setImage(null))
                            }
                            className="bg-foreground text-background px-4 py-2 rounded-md "
                            onClick={upload_image}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    Uploading <GiCancel size={18} />
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 ">
                                    Upload
                                    <Upload size={18} />
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-2">
                    <Image
                        src="/cloudinary.svg"
                        alt={"cloudinary"}
                        width={500}
                        height={500}
                    />

                    <button
                        onKeyUp={(event) =>
                            handleKeyUp(event, () => setImage(null))
                        }
                        className="flex items-center gap-1 bg-foreground text-background px-4 py-2 rounded-md "
                        onClick={upload_image}
                        disabled={loading}
                    >
                        Select Image
                        <Upload size={18} />
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        name={"cloudinary_upload"}
                        required={true}
                        onChange={handle_image}
                        ref={inputRef}
                        className="hidden"
                    />
                </div>
            )}
            <ToastContainer position="bottom-right" autoClose={2000} />
        </div>
    );
};

export default CloudinaryUpload;
