'use client'

import React, { useState } from 'react'
import { toast } from 'sonner'
import { Input } from '~/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Button } from '~/components/ui/button'

export default function PassWord() {
  const [loading, setLoading] = useState(false)

  const FormSchema = z.object({
    onePassword: z.string()
      .min(1, {
        message: "旧密码必填",
      }),
    twoPassword: z.string()
      .min(6, {
        message: "密码不能少于6位数",
      })
      .max(20, {
        message: "密码不能超过20位数",
      }),
    threePassword: z.string()
      .min(6, {
        message: "密码不能少于6位数",
      })
      .max(20, {
        message: "密码不能超过20位数",
      }),
  }).refine((data: any) => data.twoPassword === data.threePassword, {
      message: "两次密码不一致",
      path: ["threePassword"], // 错误信息指向 confirmPassword 字段
    })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      onePassword: "",
      twoPassword: "",
      threePassword: "",
    },
  })

  async function updatePassword(data: z.infer<typeof FormSchema>) {
    console.log(data)
    if (data.onePassword === '') {
      toast.error('请输入旧密码！')
      return
    }
    if (data.twoPassword === '') {
      toast.error('请输入新密码！')
      return
    }
    if (data.threePassword === '') {
      toast.error('请再次输入新密码！')
      return
    }
    if (data.twoPassword !== data.threePassword) {
      toast.error('两次密码输入不一致！')
      return
    }
    try {
      setLoading(true)
      await fetch('/api/v1/settings/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword: data.onePassword,
          newPassword: data.twoPassword
        }),
      }).then(res => res.json())
      toast.success('修改成功！')
    } catch (e) {
      toast.error('修改失败！')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(updatePassword)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="onePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>旧密码</FormLabel>
              <FormControl>
                <Input className="w-full sm:w-64" placeholder="请输入旧密码。" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twoPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>新密码</FormLabel>
              <FormControl>
                <Input className="w-full sm:w-64" placeholder="请输入新密码。" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="threePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>确认密码</FormLabel>
              <FormControl>
                <Input className="w-full sm:w-64" placeholder="请输入确认密码。" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="cursor-pointer" type="submit" disabled={loading}>
          {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          提交
        </Button>
      </form>
    </Form>
  )
}