import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface BlogPostEditorProps {
  initialContent?: string;
  onContentChange: (content: string) => void;
}

export default function BlogPostEditor({
  initialContent = '',
  onContentChange,
}: BlogPostEditorProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    if (initialContent !== content) {
      setContent(initialContent);
    }
  }, [initialContent]);
  const handleEditorChange = (content: string) => {
    setContent(content);
    onContentChange(content);
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor="content"
        className="block text-sm font-bold text-gray-700"
      >
        Content
      </label>
      <Editor
        id="content"
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        initialValue={''}
        value={content}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          directionality: 'ltr',
          forced_root_block: 'p',
          remove_trailing_brs: true,
          branding: false,
          elementpath: false,
          convert_urls: false,
          entity_encoding: 'raw',
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
}
