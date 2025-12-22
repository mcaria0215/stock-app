'use client';

import { useForm } from "react-hook-form"
import CountrySelectField from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { Button } from "@/components/ui/button";
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from "@/lib/constants";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      country: 'KO',
      investmentGoals: 'Growth',
      riskTolerance: 'Medium',
      preferredIndustry: 'Technology'
    },
    mode: 'onBlur',
  },);

  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <h1 className="form-title">Sign Up & Personalize</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField 
          name="fullName"
          label="Full Name"
          placeholder="홍길동"
          register={register}
          error={errors.fullName}
          validation={{
            required: '이름을 입력해주세요.', minLength: { value: 2, message: '이름은 최소 2자 이상이어야 합니다.' }
          }}
        />

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
            required: '비밀번호를 입력해주세요.', minLength: { value: 8, message: '비밀번호는 최소 8자 이상이어야 합니다.' }
          }}
        />

        <CountrySelectField
          name="country"
          label="Country"                    
          control={control}
          error={errors.country}
          required
        />

        <SelectField
          name="investmentGoals"
          label="Investment Goals"
          placeholder="Select your investment goal"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required
        />

        <SelectField
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder="Select your risk level"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
        />

        <SelectField
          name="preferredIndustry"
          label="Preferred Industry"
          placeholder="Select your preferred industry"
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          required
        />

        <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
          {isSubmitting? '계정 생성 중...' : 'Start Your Investing Journey'}
        </Button>

        <FooterLink text="Already have an account?" linkText="Sign in" href="/sign-in" />
      </form>
    </>
  )
}

export default SignUp