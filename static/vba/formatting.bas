Attribute VB_Name = "Module1"
Sub Macro1()
'
' Macro1 Macro
'
' Keyboard Shortcut: Ctrl+Shift+F
'
    Columns("C:C").Select
    Selection.Delete Shift:=xlToLeft
    Columns("E:O").Select
    Selection.Delete Shift:=xlToLeft
End Sub
