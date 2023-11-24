import prisma from '../../../../lib/prisma'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const userId = params.id
  const result = await prisma.user.delete({
    where: {
      id: +userId
    }
  })
  return Response.json({ message: 'ok', status: 200, data: result })
}