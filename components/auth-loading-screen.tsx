import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface AuthLoadingScreenProps {
  message?: string
}

export function AuthLoadingScreen({ message = "Setting up your account..." }: AuthLoadingScreenProps) {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-sm w-full mx-4 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">HB</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome to HireBench</h2>
          <p className="text-gray-600 text-sm">{message}</p>
        </div>
        
        <LoadingSpinner size="lg" className="mb-4" />
        
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}
