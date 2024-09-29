import { Label } from '@/components/ui/label.jsx';
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {UploadCloudIcon, FileIcon, XIcon} from "lucide-react";
import { useRef } from 'react';
import PropTypes from 'prop-types';

UploadImage.propTypes = {
    imageFile: PropTypes.object,
    setImageFile: PropTypes.func,
    imageUrl: PropTypes.string,
    setImageUrl: PropTypes.func,
};

function UploadImage({ imageFile, setImageFile, imageUrl, setImageUrl }) {
    const inputRef = useRef(null);

    const handleImageFileChange = (event) => {
        setImageFile(event.target.files[0]);
        setImageUrl(URL.createObjectURL(event.target.files[0]));
    }

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDrop = (event) => {
        event.preventDefault();
        setImageFile(event.dataTransfer.files[0]);
        setImageUrl(URL.createObjectURL(event.dataTransfer.files[0]));
    }

    const handleRemoveImage = () => {
        setImageFile(null);
        setImageUrl(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <div className="w-full mx-auto mb-4 px-1">
                <Label className="mb-2 block">Upload Image</Label>
                <div className="border-2 border-dashed rounded-lg p-4" onDragOver={handleDragOver} onDrop={handleDrop}>
                    <Input
                        id="image-upload"
                        type="file"
                        ref={inputRef}
                        className="hidden"
                        onChange={handleImageFileChange}
                    />

                    {!imageUrl ? (
                        <Label
                            htmlFor="image-upload"
                            className="flex flex-col items-center justify-center h-32 cursor-pointer"
                        >
                            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
                            <span>Drag & drop or click to upload image</span>
                        </Label>
                    ) : (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center cursor-pointer" onClick={() => openInNewTab(imageUrl)}>
                                <FileIcon className="w-8 text-primary mr-2 h-8"/>
                                <p className="text-sm font-medium">{imageFile ? imageFile.name : "Image"}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-foreground"
                                onClick={handleRemoveImage}
                            >
                                <XIcon className="w-4 h-4"/>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default UploadImage;