'use client'

import { ChangeEvent, InputHTMLAttributes, useState } from 'react'

interface MediaPickerProps extends InputHTMLAttributes<HTMLInputElement> {}

export function MediaPicker(props: MediaPickerProps) {
  const [preview, setPreview] = useState<string | null>(null)
  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) return

    const previewUrl = URL.createObjectURL(file)

    setPreview(previewUrl)
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        type="file"
        accept="image/*,video/*"
        className="invisible h-0 w-0"
        {...props}
      />
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
