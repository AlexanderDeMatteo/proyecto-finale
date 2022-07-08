"""empty message

Revision ID: b7ec67373fcb
Revises: 890f92e918f5
Create Date: 2022-07-04 23:06:31.153412

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b7ec67373fcb'
down_revision = '890f92e918f5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('profile_picture', sa.String(length=500), nullable=True))
    op.add_column('user', sa.Column('monto', sa.String(length=25), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'monto')
    op.drop_column('user', 'profile_picture')
    # ### end Alembic commands ###