'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../src/components/common/Button';
import { Card } from '../src/components/common/Card';
import { Input } from '../src/components/common/Input';
import { PageHeader } from '../src/components/common/PageHeader';
import { Select } from '../src/components/common/Select';
import { mockUsers, roleLabels } from '../src/mock/users';

const findUserById = (id: string) => mockUsers.find((user) => user.id === id);

export default function Home() {
  const router = useRouter();
  const defaultUser = useMemo(() => mockUsers[0], []);
  const [selectedUserId, setSelectedUserId] = useState(defaultUser?.id ?? '');
  const [email, setEmail] = useState(defaultUser?.email ?? '');
  const [password, setPassword] = useState(defaultUser?.password ?? '');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const matched = mockUsers.find(
      (user) => user.email === email.trim() && user.password === password.trim(),
    );

    if (matched) {
      setError('');
      router.push(matched.redirect);
      return;
    }

    setError('이메일 혹은 비밀번호가 올바르지 않습니다. 아래의 테스트 계정 정보를 확인해주세요.');
  };

  return (
    <div className="space-y-6">
      <PageHeader title="로그인" description="고객 · 관리자 · 배송기사 전용 테스트 계정으로 바로 로그인해보세요." />

      <div className="grid gap-4 md:grid-cols-5">
        <Card className="md:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-800" htmlFor="mock-user-select">
                로그인할 사용자 선택
              </label>
              <Select
                id="mock-user-select"
                value={selectedUserId}
                onChange={(event) => {
                  const user = findUserById(event.target.value);
                  setSelectedUserId(event.target.value);
                  if (user) {
                    setEmail(user.email);
                    setPassword(user.password);
                    setError('');
                  }
                }}
              >
                {mockUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {`${user.name} · ${roleLabels[user.role]}`}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-800" htmlFor="email">
                이메일
              </label>
              <Input
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="mock 계정 이메일"
                type="email"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-800" htmlFor="password">
                비밀번호
              </label>
              <Input
                id="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="mock 계정 비밀번호"
                type="password"
                required
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button type="submit" className="w-full">
              로그인하고 이동하기
            </Button>
          </form>
        </Card>

        <Card className="md:col-span-2">
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-gray-900">테스트 계정 정보</h2>
            <p className="text-sm text-gray-600">선택하면 이메일과 비밀번호가 자동으로 입력됩니다.</p>
            <ul className="space-y-3">
              {mockUsers.map((user) => (
                <li key={user.id} className="rounded-lg bg-gray-50 p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-gray-900">{user.name}</div>
                    <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      {roleLabels[user.role]}
                    </span>
                  </div>
                  <div className="mt-1 text-gray-700">{user.description}</div>
                  <div className="mt-2 grid grid-cols-1 gap-1 text-xs text-gray-600 sm:grid-cols-2">
                    <div>
                      <span className="font-medium">이메일:</span> {user.email}
                    </div>
                    <div>
                      <span className="font-medium">비밀번호:</span> {user.password}
                    </div>
                    <div className="sm:col-span-2">
                      <span className="font-medium">로그인 후 이동:</span> {user.redirect}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
