'use client';

import { FormEvent, useState } from 'react';
import { Button } from '../../../src/components/common/Button';
import { Card } from '../../../src/components/common/Card';
import { Input } from '../../../src/components/common/Input';
import { PageHeader } from '../../../src/components/common/PageHeader';

const defaultProfile = {
  id: 'customer',
  phone: '010-1234-5678',
  address: '부산광역시 연제구 중앙대로 1000',
  addressDetail: '부산 시청 3층 민원실 앞',
};

export default function CustomerProfilePage() {
  const [phone, setPhone] = useState(defaultProfile.phone);
  const [address, setAddress] = useState(defaultProfile.address);
  const [addressDetail, setAddressDetail] = useState(defaultProfile.addressDetail);
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
              주소
            </label>
            <Input
              id="address"
              name="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="부산광역시 ..."
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800" htmlFor="addressDetail">
              상세 주소
            </label>
            <Input
              id="addressDetail"
              name="addressDetail"
              value={addressDetail}
              onChange={(event) => setAddressDetail(event.target.value)}
              placeholder="상세 위치를 입력해주세요"
            />
          </div>

          {profileMessage && <p className="text-sm text-green-700">{profileMessage}</p>}

          <Button type="submit" className="w-full">
            연락처/주소 저장
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
    </div>
  );
}
