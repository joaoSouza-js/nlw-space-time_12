'use client'

import { Camera } from 'lucide-react'
import { MediaPicker } from './MediaPicker'
import { FormEvent } from 'react'
import { api } from '@/libs/api'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export function NewMemoryForm() {
  const token = Cookies.get('token')

  const router = useRouter()

  async function handleCreateNewMemorie(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const fileToUpload = formData.get('coverUrl') as File
    let coverUrl: string = ''

    try {
      if (fileToUpload.name.trim() !== '') {
        const uploadFileData = new FormData()
        uploadFileData.set('file', fileToUpload)

        const UploadResponse = await api.post<{ fileUrl: string }>(
          '/upload',
          uploadFileData,
        )
        coverUrl = UploadResponse.data.fileUrl
      }

      await api.post(
        '/memories',
        {
          content: formData.get('content'),
          isPublic: formData.get('isPublic'),
          coverUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      router.push('/')
    } catch (error) {
      console.log('error => ', error)
    }
  }
  return (
    <form
      onSubmit={handleCreateNewMemorie}
      className="flex flex-1 flex-col gap-2"
    >
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Tornar memória pública
        </label>
      </div>
      <MediaPicker id="media" name="coverUrl" />

      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />
      <button
        type="submit"
        className="flex h-8 items-center justify-center self-end rounded-full bg-green-500 px-8 font-alt text-sm font-bold uppercase text-black transition-colors hover:cursor-pointer "
      >
        Salvar
      </button>
    </form>
  )
}
