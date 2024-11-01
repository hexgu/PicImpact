'use client'

import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '~/lib/utils/fetcher'
import { toast } from 'sonner'
import { Input } from '~/components/ui/input'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'

export default function Preferences() {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  const { data, isValidating, isLoading } = useSWR('/api/v1/settings/get-custom-title', fetcher)

  async function updateTitle() {
    try {
      setLoading(true)
      await fetch('/api/v1/settings/update-custom-title', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
        }),
      }).then(res => res.json())
      toast.success('修改成功！')
    } catch (e) {
      toast.error('修改失败！')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setTitle(data?.config_value || '')
  }, [data])

  return (
    <div className="space-y-2">
      <Label htmlFor="text">网站标题</Label>
      <Input
        disabled={isValidating || isLoading}
        value={title || ''}
        type="text"
        className="w-full sm:w-64"
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex w-full sm:w-64 items-center justify-center space-x-1">
        <Button
          disabled={loading}
          onClick={() => updateTitle()}
          aria-label="提交"
        >
          {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          提交
        </Button>
      </div>
    </div>
)
}