import { Modal } from '../Modal'
import { Button } from '../Button'

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
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title}>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{message}</p>
      {children}
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-6">
        <Button variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button
          variant={buttonVariantMap[variant]}
          onClick={() => { onConfirm(); onCancel() }}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
