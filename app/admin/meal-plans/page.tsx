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

export default function AdminMealPlansPage() {
	const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
	const [selectedId, setSelectedId] = useState<string | null>(null);

	const selectedPlan = useMemo(
		() => mealPlans.find((plan) => plan.id === selectedId) ?? mealPlans[0],
		[mealPlans, selectedId]
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
		<div className='space-y-6'>
			<PageHeader
				title='식단표 관리'
				description='고객에게 공유할 식단표 이미지를 업로드하세요.'
			/>

			<Card className='space-y-4'>
				<div className='flex flex-wrap items-center justify-between gap-3'>
					<div>
						<h2 className='text-base font-semibold text-gray-900'>
							식단표 업로드
						</h2>
						<p className='text-sm text-gray-600'>
							JPG, PNG 형식의 10MB 이하로 이미지를 업로드하세요.
						</p>
					</div>
					<label className='inline-flex cursor-pointer items-center justify-center rounded-lg border border-amber-200 bg-white px-4 py-2 text-sm font-medium text-amber-700 shadow-sm transition hover:border-amber-400 hover:text-amber-800'>
						이미지 선택
						<input
							type='file'
							accept='image/*'
							className='hidden'
							onChange={handleUpload}
						/>
					</label>
				</div>
				<div className='flex min-h-[360px] items-center justify-center overflow-hidden rounded-lg border border-dashed border-amber-200 bg-amber-50/60'>
					{selectedPlan ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={selectedPlan.imageUrl}
							alt={selectedPlan.name}
							className='max-h-[420px] max-w-full object-contain'
						/>
					) : (
						<div className='text-center text-sm text-gray-500'>
							아직 업로드된 식단표가 없습니다. 상단에서 이미지를
							등록해주세요.
						</div>
					)}
				</div>
			</Card>
		</div>
	);
}
