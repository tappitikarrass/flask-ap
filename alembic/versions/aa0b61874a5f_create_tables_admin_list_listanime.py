"""create tables admin, list, listanime

Revision ID: aa0b61874a5f
Revises: 1539601f0f02
Create Date: 2022-03-12 00:47:15.733849

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'aa0b61874a5f'
down_revision = '1539601f0f02'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table("list",
        sa.Column("list_id", sa.Integer, nullable=True, primary_key=True),
        sa.Column("user_id", sa.Integer,
                  sa.ForeignKey("user.user_id",
                                onupdate="CASCADE",
                                ondelete="CASCADE"
                                ),
                  nullable=False,
                  unique=True),
        sa.Column("name", sa.String, nullable=False, unique=False)
    )
    op.create_table("list_anime",
        sa.Column("list_id", sa.Integer,
                  sa.ForeignKey("list.list_id",
                                onupdate="CASCADE",
                                ondelete="CASCADE"
                                ),
                  nullable=False,
                  unique=False),
        sa.Column("mal_id", sa.Integer, nullable=True, unique=False)
    )
    op.create_table("admin",
        sa.Column("admin_id", sa.Integer, nullable=True, primary_key=True),
        sa.Column("user_id", sa.Integer,
                  sa.ForeignKey("user.user_id",
                                onupdate="CASCADE",
                                ondelete="CASCADE"
                                ),
                  nullable=False,
                  unique=True)
    )

def downgrade():
    op.drop_table("list_anime")
    op.drop_table("list")
    op.drop_table("admin")
