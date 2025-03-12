// components/webPlanCard.tsx
import React from "react";
import { motion } from "framer-motion";
import { WebPlan } from "../../config/webPlans";

const cardVariants = {
    offscreen: {
        y: 50,
        opacity: 0,
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
};

const hoverVariants = {
    hover: {
        background: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(12px)",
        scale: 1.03
    }
};

const WebPlanCard: React.FC<{ plan: WebPlan }> = ({ plan }) => {
    return (
        <motion.div
            className="p-6 rounded-xl border border-white/20 flex flex-col justify-between relative overflow-hidden mx-auto"
            style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)"
            }}
            initial="offscreen"
            whileInView="onscreen"
            whileHover="hover"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            variants={cardVariants}
        >
            {/* Efecto de brillo dinámico */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-300/20 opacity-0 "
                animate={{
                    opacity: [0, 0.1, 0],
                    transition: { duration: 2, repeat: Infinity }
                }}
            />

            {/* Contenido */}
            <div className="relative z-10">
                <div className="mb-4">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                        {plan.header}
                    </h3>
                    <p className="text-sm text-slate-200 mt-1 opacity-90">{plan.subtitle}</p>
                </div>

                <ul className="flex-1 space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                        <motion.li
                            key={index}
                            className="text-sm md:text-base flex items-center text-slate-100"
                            whileHover={{ x: 8 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <span className="text-blue-400 mr-2">▹</span>
                            {feature}
                        </motion.li>
                    ))}
                </ul>

                <div className="border-t border-white/20 pt-4">
                    <p className="text-3xl font-bold text-slate-100">
                        ${plan.price}
                        <span className="text-sm text-slate-300 ml-2">{plan.paymentPlan}</span>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export const WebPlansGrid: React.FC<{ plans: WebPlan[] }> = ({ plans }) => {
    return (
        <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 "
            initial="hidden"
            animate="visible"
        >
            {plans.map((plan, index) => (
                <WebPlanCard key={index} plan={plan} />
            ))}
        </motion.div>
    );
};