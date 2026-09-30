import { Modal } from '../Modal'
import { Button } from '../Button'
import { useId } from 'react'

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  variant?: 'danger' | 'warning' | 'info'
  children?: React.ReactNode
}

const buttonVariantMap = {
  danger: 'destructive' as const,
  warning: 'primary' as const,
  info: 'primary' as const,
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'danger',
  children,
}: ConfirmDialogProps) {
  const messageId = useId()
  const cancelId = useId()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
      describedById={messageId}
      initialFocusId={cancelId}
    >
      {/* aria-describedby on the dialog: a screen reader user heard the title but not
          what the action would do. "This cannot be undone" is the whole point. */}
      <p id={messageId} className="text-gray-600 dark:text-gray-400 mb-4">
        {message}
      </p>
      {children}
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-6">
        {/* The safe action is focused first. Initial focus on a destructive "Delete"
            means a reflexive Enter destroys evidence. */}
        <Button id={cancelId} variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button
          variant={buttonVariantMap[variant]}
          // Previously: onConfirm(); onCancel(). Firing the cancel handler immediately
          // after confirming meant any parent doing state work in onCancel undid the
          // confirmation -- a data-loss path on the dialog that deletes evidence.
          // The caller owns closing now; confirming is confirming.
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
