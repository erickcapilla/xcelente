import { Header } from "@src/components/features/ui"
import { ShoppingList } from "@src/components/features/shopping"
import { ScrollShadow } from '@nextui-org/react'

export const Shopping = () => {
  return (
    <>
     <Header title="Compras" />
     <main className="flex flex-col gap-y-1">
        <ScrollShadow
          className="cards-container pb-1"
          size={5}
          hideScrollBar
        >
          <ShoppingList />
        </ScrollShadow>
      </main>
    </>
  )
}