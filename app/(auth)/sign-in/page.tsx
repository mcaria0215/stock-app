'use client';

import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: any) => {
    try {
      console.log("Login Data:", data);      
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <h1 className="form-title">Sign In</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">        
        <InputField 
          name="email"
          label="Email"
          placeholder="yourEmail@gmail.com"
          register={register}
          error={errors.email}
          validation={{
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '유효한 이메일 형식이 아닙니다.'
            }
          }}
        />
        
        <InputField 
          name="password"
          label="Password"
          type="password"
          placeholder="비밀번호를 입력하세요."
          register={register}
          error={errors.password}
          validation={{
            required: '비밀번호를 입력해주세요.',
          }}
        />

        <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
          {isSubmitting ? '로그인 중...' : 'Sign In'}
        </Button>
        
        <FooterLink text="Don't have an account?" linkText="Sign up" href="/sign-up" />
      </form>
    </>
  )
}

export default SignIn;