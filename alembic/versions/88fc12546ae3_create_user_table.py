"""create user table

Revision ID: 88fc12546ae3
Revises: 
Create Date: 2022-03-07 16:43:11.993804

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '88fc12546ae3'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "user",
        sa.Column("user_id", sa.Integer, nullable=True, primary_key=True),
        sa.Column("username", sa.String, nullable=False, unique=True),
        sa.Column("firstname", sa.String, nullable=True, unique=False),
        sa.Column("lastname", sa.String, nullable=True, unique=False),
        sa.Column("email", sa.String, nullable=False, unique=True),
        sa.Column("phone", sa.String, nullable=True, unique=True),
        sa.Column("password", sa.TEXT, nullable=False, unique=False)
    )


def downgrade():
    op.drop_table("user")
