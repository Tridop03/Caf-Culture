
import React from 'react';

export const CardSkeleton = () => (
  <div className="rounded-[32px] border border-brand-200 dark:border-white/10 overflow-hidden bg-white dark:bg-brand-900">
    <div className="h-48 skeleton" />
    <div className="p-6 space-y-4">
      <div className="h-6 w-3/4 skeleton rounded-lg" />
      <div className="h-4 w-full skeleton rounded-lg" />
      <div className="h-10 w-full skeleton rounded-xl mt-4" />
    </div>
  </div>
);

export const MenuSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {[1, 2, 3, 4, 5, 6].map((i) => <CardSkeleton key={i} />)}
  </div>
);

export const HeroSkeleton = () => (
  <div className="h-[500px] w-full rounded-[40px] skeleton mb-12" />
);

export const EventSkeleton = () => (
  <div className="flex gap-6 p-6 rounded-[32px] border border-brand-200 dark:border-white/10 bg-white dark:bg-brand-900">
    <div className="size-40 rounded-2xl skeleton shrink-0" />
    <div className="flex-1 space-y-4 py-2">
      <div className="h-4 w-24 skeleton rounded" />
      <div className="h-8 w-3/4 skeleton rounded" />
      <div className="h-4 w-full skeleton rounded" />
      <div className="h-10 w-32 skeleton rounded-xl" />
    </div>
  </div>
);
