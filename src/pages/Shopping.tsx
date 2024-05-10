import { Header } from "@src/components/features/ui"
import { ShoppingList } from "@src/components/features/shopping"
import { ScrollShadow } from '@nextui-org/react'
import { useUser } from "@src/hooks"

export const Shopping = () => {
  const { user } = useUser()

  return (
    <>
     <Header title={user.isAdmin ? "Pedidos" : "Mis compras"} />
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