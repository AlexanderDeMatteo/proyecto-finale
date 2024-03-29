"""empty message

Revision ID: 43ebbca2d9c2
Revises: 
Create Date: 2022-09-27 15:30:45.075032

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '43ebbca2d9c2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('last_name', sa.String(length=120), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('is_psicologo', sa.Boolean(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('is_online', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('user_address',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('country', sa.String(length=120), nullable=True),
    sa.Column('state', sa.String(length=120), nullable=True),
    sa.Column('city', sa.String(length=120), nullable=True),
    sa.Column('address', sa.String(length=300), nullable=True),
    sa.Column('status', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id')
    )
    op.create_table('user_profile_info',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('profile_picture', sa.String(length=500), nullable=True),
    sa.Column('dob', sa.String(length=20), nullable=True),
    sa.Column('dni', sa.String(length=30), nullable=True),
    sa.Column('gender', sa.String(length=10), nullable=True),
    sa.Column('phone_number', sa.String(length=25), nullable=True),
    sa.Column('fpv_number', sa.String(length=25), nullable=True),
    sa.Column('specialty_area', sa.String(length=120), nullable=True),
    sa.Column('city', sa.String(length=25), nullable=True),
    sa.Column('state', sa.String(length=25), nullable=True),
    sa.Column('twitter', sa.String(length=25), nullable=True),
    sa.Column('facebook', sa.String(length=25), nullable=True),
    sa.Column('instagram', sa.String(length=25), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('facebook'),
    sa.UniqueConstraint('fpv_number'),
    sa.UniqueConstraint('instagram'),
    sa.UniqueConstraint('twitter'),
    sa.UniqueConstraint('user_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_profile_info')
    op.drop_table('user_address')
    op.drop_table('user')
    # ### end Alembic commands ###
