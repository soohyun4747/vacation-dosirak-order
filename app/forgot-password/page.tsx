'use client';

import { FormEvent, useState } from 'react';
import { Button } from '../../src/components/common/Button';
import { Card } from '../../src/components/common/Card';
import { Input } from '../../src/components/common/Input';
import { PageHeader } from '../../src/components/common/PageHeader';

export default function ForgotPasswordPage() {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mode, setMode] = useState<'id' | 'password'>('id');
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const handleModeChange = (nextMode: 'id' | 'password') => {
    setMode(nextMode);
    setSubmitted(false);
    setMessage('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (mode === 'id') {
      setMessage('입력하신 정보와 일치하는 아이디를 가입 이메일로 안내드렸습니다.');
      return;
    }

    setMessage('입력하신 정보를 확인해 임시 비밀번호를 이메일로 전송해드렸습니다.');
  };

  return (
    <div className="space-y-6">
      <PageHeader title="아이디/비밀번호 찾기" backHref="/" />
      <Card>
        <div className="mb-4 flex gap-2">
          <Button
            type="button"
            variant={mode === 'id' ? 'primary' : 'secondary'}
            className="flex-1"
            onClick={() => handleModeChange('id')}
          >
            아이디 찾기
          </Button>
          <Button
            type="button"
            variant={mode === 'password' ? 'primary' : 'secondary'}
            className="flex-1"
            onClick={() => handleModeChange('password')}
          >
            비밀번호 찾기
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'id' && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-800" htmlFor="name">
                  이름
                </label>
                <Input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="가입자 이름"
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
            </>
          )}

          {mode === 'password' && (
            <>
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
            </>
          )}

          {submitted && <p className="text-sm text-green-700">{message}</p>}

          <Button type="submit" className="w-full">
            {mode === 'id' ? '아이디 전송' : '임시 비밀번호 전송'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
