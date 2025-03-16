import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CkEditorBlog = () => {
    return (
        <>
            <CKEditor
                editor={ClassicEditor}
                // data="<p>Hello from CKEditor 5!</p>"
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.                   
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                }}
                onBlur={(event, editor) => {
                }}
                onFocus={(event, editor) => {

                }}
            />
        </>
    );
};

export default CkEditorBlog;