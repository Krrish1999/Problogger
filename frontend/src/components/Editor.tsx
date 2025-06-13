import React, { useState, useCallback, useEffect } from 'react';
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import TextAlign from '@tiptap/extension-text-align';
import CodeBlock from '@tiptap/extension-code-block';
import Underline from '@tiptap/extension-underline';
import Document from '@tiptap/extension-document'
import CharacterCount from '@tiptap/extension-character-count'

import '../style.scss';
import { Bold, Italic,CodeIcon, Link2, Image as LucideImage, Quote, List, ListOrdered, Strikethrough, } from 'lucide-react';


interface MediumEditorProps {
  initialContent?: string;
  onContentChange?: (content: string) => void;
  placeholder?: string;
}

const MediumEditor: React.FC<MediumEditorProps> = ({
  initialContent = '',
  onContentChange,
  placeholder = 'Tell your story...'
}) => {
  const [isImageUploading, setIsImageUploading] = useState(false);



  const uploadImage = useCallback(async (file: File): Promise<string> => {
    setIsImageUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const imageUrl = URL.createObjectURL(file);
    setIsImageUploading(false);
    return imageUrl;
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Image.configure({ HTMLAttributes: { class: 'rounded-lg shadow-sm max-w-full h-auto my-4' } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-blue-600 hover:text-blue-800 underline cursor-pointer' } }),
      Placeholder.configure({ placeholder }),
      Typography,
      Underline,
      Document,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      CodeBlock.configure({
        languageClassPrefix: 'language-',
        defaultLanguage: 'plaintext',
        HTMLAttributes: {
          class:"bg-purple-100 rounded-md text-black text-sm px-[0.3em] py-[0.25em]",
        },

      })

    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onContentChange?.(html);

    },
    editorProps: {
      attributes: { class: 'prose prose-lg max-w-none focus:outline-none min-h-screen px-8 py-12', style: 'font-family: Georgia, serif; font-size: 20px; line-height: 1.58;' },
      handleDrop: (view, event) => {
        const files = Array.from(event.dataTransfer?.files || []);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        if (imageFiles.length > 0) {
          event.preventDefault();
          imageFiles.forEach(async (file) => {
            try {
              const imageUrl = await uploadImage(file);
              const { schema } = view.state;
              const node = schema.nodes.image.create({ src: imageUrl });
              const transaction = view.state.tr.replaceSelectionWith(node);
              view.dispatch(transaction);
            } catch (error) {
              console.error('Image upload failed:', error);
            }
          });
          return true;
        }
        return false;
      }
      ,
      handlePaste: (view, event) => {
        const items = Array.from(event.clipboardData?.items || []);
        const imageItems = items.filter(item => item.type.startsWith('image/'));
        if (imageItems.length > 0) {
          event.preventDefault();
          imageItems.forEach(async (item) => {
            const file = item.getAsFile();
            if (file) {
              try {
                const imageUrl = await uploadImage(file);
                const { schema } = view.state;
                const node = schema.nodes.image.create({ src: imageUrl });
                const transaction = view.state.tr.replaceSelectionWith(node);
                view.dispatch(transaction);
              } catch (error) {
                console.error('Image upload failed:', error);
              }
            }
          });
          return true;
        }
        return false;
      }
    }
  });

  

  const handleImageUpload = useCallback(async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;

    input.onchange = async (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      for (const file of files) {
        try {
          const imageUrl = await uploadImage(file);
          editor?.chain().focus().setImage({ src: imageUrl }).run();
        } catch (error) {
          console.error('Image upload failed:', error);
        }
      }
    };

    input.click();
  }, [editor, uploadImage]);

  const addLink = useCallback(() => {
    const url = window.prompt('Enter URL:');
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return <div className="flex items-center justify-center h-64">Loading editor...</div>;
  }



  return (
    <div className="max-w-4xl mx-auto bg-white relative">
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className="flex items-center bg-gray-900 text-white rounded-lg shadow-lg p-1 space-x-1">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-gray-700 p-1 rounded' : 'p-1'}><Bold size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-gray-700 p-1 rounded' : 'p-1'}><Italic size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'bg-gray-700 p-1 rounded' : 'p-1'}>U</button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'bg-gray-700 p-1 rounded-md' : 'p-1'}><Strikethrough size={16} /></button>
        <button onClick={addLink} className="p-1"><Link2 size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? "is-active ": ""}>  <CodeIcon size={16}/> </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-700 p-1 rounded' : 'p-1'}>H1</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-700 p-1 rounded' : 'p-1'}>H2</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'bg-gray-700 p-1 rounded' : 'p-1'}>H3</button>
      </BubbleMenu>


      <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }} className="z-50 flex items-center bg-white border border-gray-200 rounded-lg shadow-lg p-2 space-x-1">
        
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'bg-gray-200 p-1 rounded' : 'p-1'}><List size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'bg-gray-200 p-1 rounded' : 'p-1'}><ListOrdered size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'bg-gray-200 p-1 rounded' : 'p-1'}><Quote size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active' : ''}>  <CodeIcon size={16}/> </button>

        <button onClick={handleImageUpload} className="p-1"><LucideImage size={16} /></button>
      </FloatingMenu>

      <EditorContent editor={editor} />

      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-200"></div>

      <div className="fixed bottom-4 right-4 flex items-center space-x-4">
        <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow p-1"></div>
      </div>

      {isImageUploading && (
        <div className="fixed top-4 right-1 bg-white px-3 py-2 rounded shadow text-sm text-gray-600">
          Uploading image...
        </div>
      )}
    </div>
  );
};

export default MediumEditor;
