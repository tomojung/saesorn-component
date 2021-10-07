declare module '@toast-ui/react-image-editor' {
    import ImageEditor from 'tui-image-editor';

    export type ImageEditorProps = ConstructorParameters<typeof ImageEditor>[1];

    export default function ImageEditor(props: ImageEditorProps): JSX.Element;
}