
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
}

interface ProductDeleteDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: () => void;
}

const ProductDeleteDialog = ({ 
  product, 
  open, 
  onOpenChange, 
  onConfirmDelete 
}: ProductDeleteDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ürünü Sil</DialogTitle>
          <DialogDescription>
            Bu işlem geri alınamaz. Bu ürünü silmek istediğinizden emin misiniz?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {product && (
            <p className="text-sm font-medium">
              <span className="font-semibold">{product.name}</span> isimli ürün silinecek.
            </p>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">İptal</Button>
          </DialogClose>
          <Button variant="destructive" onClick={onConfirmDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Ürünü Sil
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDeleteDialog;
