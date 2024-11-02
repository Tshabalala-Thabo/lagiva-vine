import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DynamicDialog({
  trigger,
  title,
  description,
  children,
  footer,
  maxWidth = "sm:max-w-[425px]",
  isOpen,
  onOpenChange
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={`${maxWidth} h-[90vh] flex flex-col p-0 gap-0`}>
        {/* Fixed Header */}
        <div className="shrink-0 px-6 pb-4 border-b">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="px-6 py-4">
            {children}
          </div>
        </div>

        {/* Fixed Footer */}
        {footer && (
          <div className="shrink-0 px-6 pt-4 border-t">
            <DialogFooter>
              {footer}
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default DynamicDialog;