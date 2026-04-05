import './App.css'
import { Placeholder } from './Placeholder'
import { SharedContext } from './shared-context'
import { useSharedState } from './shared-state'

export function App() {
  const sharedState = useSharedState()

  return (
    <SharedContext.Provider value={sharedState}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="grid-cols-6 grid-rows-5 grid gap-4">
          {sharedState.items.map((_, index) => (
            <Placeholder index={index} key={index} />
          ))}
        </div>
      </div>
    </SharedContext.Provider>
  )
}
