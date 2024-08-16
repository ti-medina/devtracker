import styles from './table.module.css'

export default function ObjsTable(props) {
    const { objs, cols, sel } = props
    if (!objs)
        return null

    function onRowClick(ev) {
        console.log(ev.target)
    }

    return (
        <table>
            <thead>
                <tr>
                    {cols.map((c, i) => (
                        <th key={i}>
                            {typeof (c) == 'string' ? camelCase(c) : c.title || camelCase(c.name)}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {
                    objs.map((p, i) => (
                        <tr key={i} className={i==sel && 'selected'}>
                            {
                                cols.map((c, i) => (
                                    <td key={i}>
                                        {
                                            typeof (c) == 'string' ? p[c] :
                                                c.type == 'cards' ? <Cards items={p[c.name]} /> :
                                                    p[c.name]
                                        }
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

function Cards(props) {
    const { items } = props
    return (
        <div className={styles.cards}>
            {
                items && items.map((t, j) => (
                    <div key={j} className={styles.card}>{t}</div>
                ))
            }
        </div>
    )
}

function camelCase(str) {
    return str.replace(/^(.)/g, (match, char) => char.toUpperCase());
}