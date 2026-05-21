package com.philkes.notallyx.data.model

enum class Color {
    DEFAULT,
    CORAL,
    ORANGE,
    SAND,
    STORM,
    FOG,
    SAGE,
    MINT,
    DUSK,
    FLOWER,
    BLOSSOM,
    CLAY;

    companion object {
        fun allColorStrings() = entries.map { it.toColorString() }.toList()

        fun valueOfOrDefault(value: String) =
            try {
                Color.valueOf(value)
            } catch (e: Exception) {
                DEFAULT
            }
    }
}

fun Color.toColorString() =
    when (this) {
        Color.DEFAULT -> BaseNote.COLOR_DEFAULT
        Color.CORAL -> "#3d1e28"
        Color.ORANGE -> "#3d2a14"
        Color.SAND -> "#302a14"
        Color.STORM -> "#142240"
        Color.FOG -> "#1a2a36"
        Color.SAGE -> "#14302a"
        Color.MINT -> "#1e3628"
        Color.DUSK -> "#221440"
        Color.FLOWER -> "#3a142c"
        Color.BLOSSOM -> "#3a2430"
        Color.CLAY -> "#302818"
    }

fun String.parseToColorString() =
    try {
        android.graphics.Color.parseColor(this)
        this
    } catch (_: Exception) {
        try {
            val colorEnum = Color.valueOf(this)
            colorEnum.toColorString()
        } catch (e: Exception) {
            BaseNote.COLOR_DEFAULT
        }
    }
