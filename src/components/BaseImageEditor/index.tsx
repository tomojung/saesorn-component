import React, {useRef, useState} from "react";
import "tui-image-editor/dist/tui-image-editor.css";
import {Button, ButtonGroup} from "@mui/material";
import ImageEditor, {ImageEditorProps} from "@toast-ui/react-image-editor";

declare global {
    interface Window {
        saveAs: any;
    }
}

export type BaseImageEditorProps = {

    imgPath: string,
    translation?: {
        save: string,
        download: string,
        save_as: string,
    },

    toastEditorProp?: ImageEditorProps


    onFinishedDownload?: () => {},
    onSave?: (imageDataUrl: string) => {},
    onSaveAs?: (imageDataUrl: string, newFileName: string) => {},
}

const theme = {
    "common.bi.image": "",
    "common.bisize.width": "0",
    "common.bisize.height": "0",
    "header.display": "none"
};

const defaultTranslation = {
    save: "Save",
    download: "Download",
    save_as: "Save As"
}

function isSupportFileApi() {
    return !!(window.File && window.FileList && window.FileReader);
}

function base64ToBlob(data: string) {
    const rImageType = /data:(image\/.+);base64,/;
    let mimeString = '';
    let raw, uInt8Array, i;

    raw = data.replace(rImageType, (header, imageType) => {
        mimeString = imageType;

        return '';
    });

    raw = atob(raw);
    const rawLength = raw.length;
    uInt8Array = new Uint8Array(rawLength); // eslint-disable-line

    for (i = 0; i < rawLength; i += 1) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: mimeString});
}

export function BaseImageEditor({imgPath, translation = defaultTranslation, ...props}: BaseImageEditorProps) {
    const editorRef = useRef<any>();
    const fileName = imgPath && imgPath.split('/').reverse()[0];
    const [showPopupSaveAs, setShowPopupSaveAs] = useState<{ open: boolean, name: string }>({
        open: false,
        name: ""
    });

    const handleSave = () => {
        if (props.onSave && editorRef.current) {
            const editorInstance = editorRef.current?.getInstance();
            props.onSave(editorInstance.toDataURL())
        }
    }

    const handleDownload = () => {

        if (editorRef.current) {

            const editorInstance = editorRef.current?.getInstance();
            const dataURL = editorInstance.toDataURL();
            let imageName = editorInstance.getImageName();
            let blob, type, w;

            if (isSupportFileApi() && window.saveAs) {
                blob = base64ToBlob(dataURL);
                type = blob.type.split('/')[1];
                if (imageName.split('.').pop() !== type) {
                    imageName += `.${type}`;
                }
                window.saveAs(blob, imageName); // eslint-disable-line
            } else {
                const w = window.open();
                if (w) {
                    w.document.body.innerHTML = `<img src='${dataURL}' alt="">`;
                }
            }

            if (props.onFinishedDownload) {
                props.onFinishedDownload()
            }
        }
    }
    return <div><ImageEditor
        ref={editorRef}
        includeUI={{
            loadImage: {
                path: imgPath,
                name: fileName,
            },
            theme,
            uiSize: {
                width: '800px',
                height: '600px',
            },
            menuBarPosition: 'bottom',
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
            cornerSize: 20,
            rotatingPointOffset: 70,
        }}
        usageStatistics={false}
        {...props.toastEditorProp}
    />
        <div className={"buttonGroup"}>
            <ButtonGroup variant="contained">
                <Button onClick={() => handleSave()}>{translation.save}</Button>
                <Button onClick={() => setShowPopupSaveAs({
                    open: true,
                    name: fileName
                })}>{translation.save_as}</Button>
                <Button onClick={handleDownload}>{translation.download}</Button>
            </ButtonGroup>
        </div>
        {/*{showPopupSaveAs.open &&*/}
        {/*<PopupSaveAs*/}
        {/*    showPopupSaveAs={showPopupSaveAs}*/}
        {/*    setShowPopupSaveAs={setShowPopupSaveAs}*/}
        {/*    onSaveAs={async (newDestination) => {*/}
        {/*        setShowPopupSaveAs({*/}
        {/*            open: false,*/}
        {/*            name: null*/}
        {/*        })*/}
        {/*        await handleSave(newDestination)*/}
        {/*    }}*/}
        {/*/>}*/}
    </div>
}
