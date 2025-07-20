"use client"

import { motion } from "framer-motion"

const MobileQuickActions = ({ actions, onActionClick }: { actions: any[], onActionClick: (action: string) => void }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map((action, index) => (
        <motion.button
          key={action.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileTap={{ scale: 0.95 }} // Touch feedback
          onClick={() => onActionClick(action.action)}
          className="p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-sm active:shadow-lg transition-all"
        >
          <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mx-auto mb-3`}>
            <action.icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-medium text-gray-900 text-sm mb-1">{action.title}</h3>
          <p className="text-xs text-gray-500">{action.description}</p>
        </motion.button>
      ))}
    </div>
  )
}

export default MobileQuickActions;
