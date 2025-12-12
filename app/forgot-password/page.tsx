'use client';

import { FormEvent, useState } from 'react';
import { Button } from '../../src/components/common/Button';
import { Card } from '../../src/components/common/Card';
import { Input } from '../../src/components/common/Input';
import { PageHeader } from '../../src/components/common/PageHeader';

export default function ForgotPasswordPage() {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="비밀번호 찾기" backHref="/" />
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800" htmlFor="userId">
              아이디
            </label>
            <Input
              id="userId"
              name="userId"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              placeholder="가입한 아이디"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800" htmlFor="email">
              가입 이메일
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          {submitted && (
            <p className="text-sm text-green-700">
              입력하신 정보를 확인해 임시 비밀번호를 이메일로 전송해드렸습니다.
            </p>
          )}

          <Button type="submit" className="w-full">
            임시 비밀번호 전송
          </Button>
        </form>
      </Card>
    </div>
  );
}
