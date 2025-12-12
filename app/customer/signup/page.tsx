'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { Button } from '../../../src/components/common/Button';
import { Card } from '../../../src/components/common/Card';
import { Checkbox } from '../../../src/components/common/Checkbox';
import { Input } from '../../../src/components/common/Input';
import { PageHeader } from '../../../src/components/common/PageHeader';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ name, phone, agree });
    router.push('/customer/order');
  };

  return (
    <div className="space-y-6">
      <PageHeader title="회원가입" backHref="/" />
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">이름</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder="이름을 입력하세요" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">전화번호</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="010-0000-0000" />
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} /> 개인정보 처리방침에 동의합니다.
          </label>
          <Button type="submit" className="w-full" disabled={!agree}>
            가입하기
          </Button>
        </form>
      </Card>
    </div>
  );
}
