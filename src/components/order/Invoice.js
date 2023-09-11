import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from '@david.kucsai/react-pdf-table'

const Invoice = ({ order }) => {
  return (
    <Document>
      <Page size='A4' style={styles.body}>
        <Text style={styles.header}>
          ~ {new Date(order.paymentIntent.created * 1000).toLocaleDateString()}{' '}
          ~
        </Text>
        <Text style={styles.title}>Order Invoice</Text>
        <Text style={styles.author}>Name of the website</Text>
        <Text style={styles.subtitle}>Order summary</Text>

        <Table>
          <TableHeader>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Color</TableCell>
          </TableHeader>
        </Table>

        <Table data={order.products}>
          <TableBody>
            <DataTableCell
              getContent={orderProducts => orderProducts.product.title}
            />
            <DataTableCell
              getContent={orderProducts => `$${orderProducts.product.price}`}
            />
            <DataTableCell getContent={orderProducts => orderProducts.count} />
            <DataTableCell
              getContent={orderProducts => orderProducts.product.brand}
            />
            <DataTableCell
              getContent={orderProducts => orderProducts.product.color}
            />
          </TableBody>
        </Table>

        <Text style={styles.text}>
          <Text>
            Date:{' '}
            {new Date(order.paymentIntent.created * 1000).toLocaleDateString()}
          </Text>
          {'\n'}
          <Text>Order id: {order.paymentIntent.id}</Text>
          {'\n'}
          <Text>
            Paid amount: ${(order.paymentIntent.amount / 100).toFixed(2)}
          </Text>
          {'\n'}
          <Text>Order status: {order.orderStatus}</Text>
        </Text>

        <Text style={styles.footer}>~ Thank you for choosing us! ~</Text>
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  footer: {
    padding: '100px',
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
})

export default Invoice
