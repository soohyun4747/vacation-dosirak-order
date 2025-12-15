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
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    console.log({ name, username, phone, password, agree });
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
            <label className="mb-1 block text-sm font-medium">아이디</label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="아이디를 입력하세요"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">전화번호</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="010-0000-0000"
              type="tel"
              autoComplete="tel"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">비밀번호</label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="비밀번호를 입력하세요"
              type="password"
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">비밀번호 확인</label>
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="비밀번호를 다시 입력하세요"
              type="password"
              autoComplete="new-password"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-900">개인정보 처리방침</p>
            <div className="max-h-56 space-y-3 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm leading-relaxed text-gray-700">
              <div>
                <p className="font-semibold">1. 개인정보의 처리 목적</p>
                <p>
                  회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지
                  않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할
                  예정입니다.
                </p>
                <p>서비스 제공: 콘텐츠 제공, 맞춤 서비스 제공, 본인인증, 주문 및 배송 처리 등</p>
                <p>
                  회원 관리: 회원제 서비스 이용 및 제한적 본인확인제 시행에 따른 본인확인, 개인 식별, 불량회원의 부정 이용 방지와
                  비인가 사용 방지, 가입 의사 확인, 연령확인, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달, 접속
                  빈도 파악 또는 회원의 서비스 이용에 대한 통계
                </p>
              </div>
              <div>
                <p className="font-semibold">2. 처리하는 개인정보 항목</p>
                <p>필수항목: 수집 항목: 이름, 전화번호, 주소</p>
                <p>수집 방법: 웹 앱 회원가입, 주문 페이지</p>
              </div>
              <div>
                <p className="font-semibold">3. 개인정보의 처리 및 보유 기간</p>
                <p>
                  회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간
                  내에서 개인정보를 처리·보유합니다.
                </p>
                <p>보존 항목: 이름, 전화번호, 주소, 마케팅 정보 수신 동의 여부</p>
                <p>보존 근거: 전자상거래 등에서의 소비자보호에 관한 법률, 통신비밀보호법 등</p>
                <p>보존 기간: 이름, 전화번호, 주소: 배송 완료 후 6개월, 결제 완료 후 5년</p>
                <p>마케팅 정보 수신 동의 여부: 수신 동의 철회 시 또는 회원 탈퇴 시까지</p>
              </div>
              <div>
                <p className="font-semibold">4. 개인정보의 제3자 제공</p>
                <p>
                  회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의
                  특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
                </p>
                <p>개인정보를 제공받는 자: 배송 업체, 결제 대행사 등</p>
                <p>제공받는 자의 개인정보 이용 목적: 배송, 결제 처리 등</p>
                <p>제공하는 개인정보 항목: 이름, 전화번호, 주소</p>
                <p>개인정보를 제공받는 자의 보유·이용기간: 서비스 제공 완료 후 지체 없이 파기</p>
              </div>
              <div>
                <p className="font-semibold">5. 정보주체와 법정대리인의 권리·의무 및 행사방법</p>
                <p>정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.</p>
                <ul className="list-disc pl-5">
                  <li>개인정보 열람요구</li>
                  <li>오류 등이 있을 경우 정정 요구</li>
                  <li>삭제요구</li>
                  <li>처리정지 요구</li>
                </ul>
                <p>
                  정보주체의 권리 행사는 회사에 대해 개인정보 보호법 시행규칙 별지 제8호 서식에 따라 서면, 전자우편, 모사전송(FAX)
                  등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.
                </p>
                <p>
                  정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는 정정 또는 삭제를 완료할 때까지 당해
                  개인정보를 이용하거나 제공하지 않습니다.
                </p>
                <p>만 14세 미만 아동의 개인정보 처리에 관하여는 법정대리인이 아동의 개인정보 보호 관련 권리를 행사할 수 있습니다.</p>
              </div>
              <div>
                <p className="font-semibold">6. 개인정보의 파기</p>
                <p>
                  회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를
                  파기합니다.
                </p>
                <p>
                  정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를
                  계속 보존하여야 하는 경우에는, 해당 개인정보(또는 개인정보파일)을 별도의 데이터베이스(DB)로 옮기거나 보관 장소를
                  달리하여 보존합니다.
                </p>
                <p>
                  개인정보 파기의 절차 및 방법은 다음과 같습니다. 파기절차: 회사는 파기하여야 하는 개인정보(또는 개인정보파일)에 대해
                  개인정보 파기계획을 수립하여 파기합니다. 회사는 파기 사유가 발생한 개인정보(또는 개인정보파일)을 선정하고, 회사의
                  개인정보 보호책임자의 승인을 받아 개인정보(또는 개인정보파일)을 파기합니다.
                </p>
                <p>파기방법: 회사는 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.</p>
              </div>
              <div>
                <p className="font-semibold">7. 개인정보 자동 수집 장치의 설치·운영 및 거부</p>
                <p>회사는 정보주체의 이용정보를 저장하고 수시로 불러오는 &lsquo;쿠키(cookie)&rsquo;를 사용하지 않습니다.</p>
              </div>
              <div>
                <p className="font-semibold">8. 개인정보 보호책임자</p>
                <p>개인정보 보호책임자: 이영민</p>
                <p>연락처: 010-2209-3474</p>
              </div>
              <div>
                <p className="font-semibold">9. 개인정보 처리방침 변경</p>
                <p>이 개인정보 처리방침은 2025년 12월 22일부터 적용됩니다.</p>
                <p>
                  ※ 본 개인정보 처리방침은 관련 법령 및 지침의 변경 또는 회사 내부 운영 방침의 변경에 따라 변경될 수 있습니다.
                  개인정보 처리방침이 변경되는 경우 변경된 사항을 홈페이지 공지사항을 통하여 공개합니다.
                </p>
                <p>공고일자: 2025년 12월 22일</p>
                <p>시행일자: 2025년 12월 22일</p>
              </div>
            </div>
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
