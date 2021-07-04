import { useState, useEffect } from 'react';

import { getUUID } from 'utils/utils';

const useScrollLock = (bodyScrollLockTargetId, modalType = 'modal') => {
  const [modalId, setModalId] = useState(null);
  const [bodyScrollLockTarget, setBodyScrollLockTarget] = useState(null);

  useEffect(() => {
    const id = getUUID();
    setModalId(id);
    const target = bodyScrollLockTargetId
      ? `#${bodyScrollLockTargetId}`
      : `#${modalType}${id}`;
    setBodyScrollLockTarget(target);
  }, [bodyScrollLockTargetId, modalType]);

  return {
    modalId,
    bodyScrollLockTarget,
  };
};

export default useScrollLock;
