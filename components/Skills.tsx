import React from 'react'
import { motion } from 'framer-motion'
import Skill from './Skill'

type Props = {sks: any}

export default function Skills({ sks }: Props) {
    const sksList = sks.Skills
    return (
        <motion.div initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className='h-screen flex relative overflow-hidden flex-col text-left md:flex-row max-w-full px-10 justify-evenly mx-auto items-center'>
            <h3 className='absolute top-[85px] uppercase tracking-[20px] text-blue-200 text-3xl'>Skills</h3>
            <h3 className='absolute top-[125px] uppercase tracking-[5px] text-white text-sm'>Hover over the icons</h3>

            <div className='grid grid-cols-4 gap-6'>
                {sksList.map((skill: { img: string; progress: number; skillName: string }, index: number) => <Skill key={index} img={skill.img} progress={skill.progress} skillName={skill.skillName} /> )}
            </div>
        </motion.div>
    )
}