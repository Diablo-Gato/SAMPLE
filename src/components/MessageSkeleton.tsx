export function MessageSkeleton() {
  return (
    <div className="d-flex mb-3">
      <div className="bg-white rounded p-3 shadow-sm" style={{ maxWidth: '80%' }}>
        <div className="d-flex align-items-center">
          <div className="bg-secondary rounded-circle me-2" style={{ width: '32px', height: '32px' }}></div>
          <div className="flex-grow-1">
            <div className="bg-secondary rounded mb-2" style={{ height: '16px', width: '60%' }}></div>
            <div className="bg-secondary rounded" style={{ height: '12px', width: '40%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MessageSkeletonList({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <MessageSkeleton key={index} />
      ))}
    </>
  );
}
