import * as React from 'react';

export const useCalendarDragDrop = ({ updatePostSchedule }) => {
  const [draggedPost, setDraggedPost] = React.useState(null);
  const [dropTarget, setDropTarget] = React.useState(null);
  const [showConflictDialog, setShowConflictDialog] = React.useState(false);
  const [conflictData, setConflictData] = React.useState(null);

  const handleDragStart = (e, post) => {
    setDraggedPost(post);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, targetDate, targetTime) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDropTarget({ date: targetDate, time: targetTime });
  };

  const handleDrop = async (e, targetDate, targetTime) => {
    e.preventDefault();

    if (!draggedPost) return;

    // In a real app, you'd check for conflicts here.
    // For now, we'll just simulate it.
    const conflicts = []; // checkSchedulingConflicts(draggedPost, targetDate, targetTime);

    if (conflicts.length > 0) {
      setShowConflictDialog(true);
      setConflictData({ post: draggedPost, conflicts, newTime: { targetDate, targetTime } });
      return;
    }

    await updatePostSchedule(draggedPost.id, targetDate, targetTime);

    setDraggedPost(null);
    setDropTarget(null);
  };

  const handleDragEnd = () => {
    setDraggedPost(null);
    setDropTarget(null);
  };

  return {
    draggedPost,
    dropTarget,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    showConflictDialog,
    setShowConflictDialog,
    conflictData,
  };
};
