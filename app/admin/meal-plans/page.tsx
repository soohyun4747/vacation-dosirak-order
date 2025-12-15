'use client';

import { ChangeEvent, useMemo, useState } from 'react';
import { Button } from '../../../src/components/common/Button';
import { Card } from '../../../src/components/common/Card';
import { PageHeader } from '../../../src/components/common/PageHeader';

type MealPlan = {
  id: string;
  name: string;
  uploadedAt: string;
  imageUrl: string;
  size: number;
};

const formatBytes = (size: number) => {
  if (size === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return `${(size / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
};

export default function AdminMealPlansPage() {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedPlan = useMemo(
    () => mealPlans.find((plan) => plan.id === selectedId) ?? mealPlans[0],
    [mealPlans, selectedId],
  );

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const newPlan: MealPlan = {
      id: crypto.randomUUID(),
      name: file.name,
      uploadedAt: new Date().toISOString(),
      imageUrl: URL.createObjectURL(file),
      size: file.size,
    };

    setMealPlans((prev) => [newPlan, ...prev]);
    setSelectedId(newPlan.id);
    event.target.value = '';
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="식단표 관리"
        description="배송팀과 드라이버에게 공유할 식단표 이미지를 업로드하세요."
      />

      <Card className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-gray-900">식단표 업로드</h2>
            <p className="text-sm text-gray-600">
              JPG, PNG 형식의 이미지를 업로드하세요. 새로운 식단표가 업로드되면 바로 목록에 추가됩니다.
            </p>
          </div>
          <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-amber-200 bg-white px-4 py-2 text-sm font-medium text-amber-700 shadow-sm transition hover:border-amber-400 hover:text-amber-800">
            이미지 선택
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </label>
        </div>
        <div className="rounded-lg border border-dashed border-amber-200 bg-amber-50/60 p-4 text-sm text-gray-700">
          <p className="font-medium text-amber-800">업로드 안내</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-600">
            <li>식단표 이미지는 10MB 이하로 업로드하세요.</li>
            <li>최근에 업로드한 식단표가 자동으로 선택되어 미리보기됩니다.</li>
            <li>업로드된 이미지는 목록에서 선택하여 다시 확인할 수 있습니다.</li>
          </ul>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">식단표 미리보기</h3>
            {selectedPlan && (
              <span className="text-xs text-gray-500">
                {new Date(selectedPlan.uploadedAt).toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex min-h-[360px] items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
            {selectedPlan ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={selectedPlan.imageUrl}
                alt={selectedPlan.name}
                className="max-h-[420px] max-w-full object-contain"
              />
            ) : (
              <div className="text-center text-sm text-gray-500">
                아직 업로드된 식단표가 없습니다. 상단에서 이미지를 등록해주세요.
              </div>
            )}
          </div>
        </Card>

        <Card className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">업로드 기록</h3>
            <Button variant="secondary" onClick={() => setSelectedId(mealPlans[0]?.id ?? null)} disabled={!mealPlans.length}>
              최신 식단표 보기
            </Button>
          </div>
          <div className="divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-100">
            {mealPlans.length === 0 && (
              <div className="p-4 text-sm text-gray-500">등록된 식단표가 없습니다.</div>
            )}
            {mealPlans.map((plan) => {
              const isActive = selectedPlan?.id === plan.id;
              return (
                <button
                  key={plan.id}
                  onClick={() => setSelectedId(plan.id)}
                  className={`flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm transition ${
                    isActive ? 'bg-amber-50 text-amber-900' : 'hover:bg-amber-50'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-gray-900">{plan.name}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(plan.uploadedAt).toLocaleString()} • {formatBytes(plan.size)}
                    </div>
                  </div>
                  <span className="text-xs text-amber-700">{isActive ? '선택됨' : '미리보기'}</span>
                </button>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
