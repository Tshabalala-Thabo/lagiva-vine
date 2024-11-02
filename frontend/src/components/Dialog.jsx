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
  maxWidth = "w-[95vw] sm:max-w-[425px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[800px]",
  isOpen,
  onOpenChange
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className={`${maxWidth} min-h-[200px] max-h-[90vh] h-auto grid grid-rows-[auto_1fr_auto]`}
      >
        {/* Fixed Header */}
        <DialogHeader className="px-6 pb-4 border-b">
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="overflow-y-auto relative">
          <div className="px-6 py-4">
            {children}
          </div>
        </div>

        {/* Fixed Footer */}
        {footer && (
          <DialogFooter className="px-6 pt-4 border-t">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default DynamicDialog;