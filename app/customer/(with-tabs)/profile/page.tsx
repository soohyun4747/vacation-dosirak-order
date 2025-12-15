'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/src/components/common/Button';
import { Card } from '@/src/components/common/Card';
import { Input } from '@/src/components/common/Input';
import { PageHeader } from '@/src/components/common/PageHeader';

const defaultProfile = {
  id: 'customer',
  phone: '010-1234-5678',
  name: '정수현'
};

export default function CustomerProfilePage() {
  const [phone, setPhone] = useState(defaultProfile.phone);
  const [name, setName] = useState(defaultProfile.name)
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const handleProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProfileMessage('연락처와 주소 정보를 저장했습니다.');
  };

  const handlePasswordSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordMessage('새 비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
      return;
    }

    setPasswordMessage('비밀번호가 성공적으로 변경되었습니다.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-6">
      <PageHeader title="프로필" backHref="/customer/order" />

      <Card className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-gray-900">아이디</p>
          <p className="text-sm text-gray-700">{defaultProfile.id}</p>
        </div>

        <form onSubmit={handleProfileSubmit} className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800" htmlFor="phone">
              전화번호
            </label>
            <Input
              id="phone"
              name="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="010-0000-0000"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800" htmlFor="address">
              이름
            </label>
            <Input
              id="name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="이름"
              required
            />
          </div>

          {profileMessage && <p className="text-sm text-green-700">{profileMessage}</p>}

          <Button type="submit" className="w-full">
            연락처/이름 저장
          </Button>
        </form>
      </Card>

      <Card className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">비밀번호 변경</h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800" htmlFor="currentPassword">
              현재 비밀번호
            </label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              placeholder="현재 비밀번호"
              required
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-800" htmlFor="newPassword">
                새 비밀번호
              </label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="새 비밀번호"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-800" htmlFor="confirmPassword">
                새 비밀번호 확인
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="새 비밀번호 확인"
                required
              />
            </div>
          </div>

          {passwordMessage && <p className="text-sm text-green-700">{passwordMessage}</p>}

          <Button type="submit" className="w-full">
            비밀번호 변경
          </Button>
        </form>
      </Card>
      <div className='w-full flex items-center justify-center'><p className='text-gray-500 text-sm underline'>로그아웃</p></div>
    </div>
  );
}
