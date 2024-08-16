"use client"
import Section from "@/components/ui/section"
import ObjsTable from "@/components/ui/table"
import { useEffect, useState } from "react"

export default function Developer(props) {
    const [developer, setDeveloper] = useState(undefined)
    const { params: { username } } = props

    useEffect(() => {
        fetch(`/api/dev/${username}`)
            .then(res => res.json())
            .then(obj => setDeveloper(obj))
    }, [])

    if (developer === undefined)
        return <div className='cont'>Loading...</div>

    return (
        <div className='cont'>
            <Section title='Projects' expanded={true}>
                <ObjsTable objs={developer.projects} cols={projectCols} />
            </Section>
            <Section title='High Priority Bugs' expanded={true}>
                <ObjsTable objs={developer.highpri} cols={projectCols} />
            </Section>
            <Section title='Backports' expanded={true}>
                <ObjsTable objs={developer.backports} cols={projectCols} />
            </Section>
            <Section title='RTIs' expanded={true}>
                <ObjsTable objs={developer.rtis} cols={projectCols} />
            </Section>
            <Section title='Bugs' expanded={true}>
                <ObjsTable objs={developer.bugs} cols={projectCols} />
            </Section>
            <Section title='Backlog' expanded={false}>
                <ObjsTable objs={developer.backlog} cols={projectCols} />
            </Section>
        </div>
    )
}


const projectCols = [
    { name: 'num', title: 'ID' },
    'description',
    'status',
    { name: 'tags', type: 'cards' },
]